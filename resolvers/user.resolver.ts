import { generateRadomString } from "../helpers/generate";
import User from "../models/user.model";
import md5 from "md5";

export const resolversUser = {
	Query: {
		getUser: async (_, args, context) => {
			if(context["user"]){
				const infoUser = await User.findOne({
					token: context["user"].token,
					deleted: false
				})
	
				if(infoUser) {
					return {
						code: 200,
						message: "Thành công",
						fullName: infoUser.fullName,
						email: infoUser.email,
						token: infoUser.token,
						id: infoUser.id
					}
				} else {
					return {
						code: 400,
						message: 'Lỗi'
					}
				}
			} else {
				return{
					code: 403,
					message: "Không có quyền truy cập!"
				}
			}
			
		}	
	},

    Mutation: {
        registerUser: async (_, args) => {
			const { user } = args;

			const emailExist = await User.findOne({
				email: user.email,
				deleted: false
			});

			if(emailExist) {
				return {
					code: 400,
					message: "Email đã tồn tại!"
				}
			} else {
				user.password = md5(user.password);

				user.token = generateRadomString(30);

				const newUser = new User(user);

				const data = await newUser.save();

				return {
					code: 200,
					message: "Đăng kí thành công!",
					id: data.id,
					fullName: data.fullName,
					email: data.email,
					token: data.token
				}
			}
		},

        loginUser: async (_, args) => {
			const {email, password} = args.user;

			const infoUser = await User.findOne({
				email: email,
				deleted: false
			});

			if(!infoUser) {
				return {
					code: 400,
					message: "Email không tồn tại!"
				}
			}
			if(md5(password) !== infoUser.password) {
				return {
					code: 400,
					message: "Sai mật khẩu!"
				}
			} 
				return {
					code: 200,
					message: "Đăng nhập thành công!",
					id: infoUser.id,
					fullName: infoUser.fullName,
					email: infoUser.email,
					token: infoUser.token
				}
		}
    }
};
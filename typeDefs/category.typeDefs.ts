import { gql } from "apollo-server-express";


export const typeDefsCategory = gql` 
        # định nghĩa các trường dữ liệu mà cho phép fontend lấy
        type Category {
            id: ID,
            title: String,
            avatar: String
	    }

        # Query: viết những hàm cho phép truy vấn ra data
        type Query { 
            getListCategory: [Category],
            getCategory(id: ID): Category
        }

        # định nghĩa những trường data cho phép nhập, cho phép gửi lên
        input CategoryInput {
            title: String,
            avatar: String
        }

        #Mutation: viết những hàm cho phép thêm sửa xoá dữ liệu
        type Mutation {
            createCategory(category: CategoryInput): Category,
            updateCategory(id: ID, category: CategoryInput): Category,
            deleteCategory(id: ID): String,
        }
    `
;
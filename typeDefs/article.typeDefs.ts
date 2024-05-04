import { gql } from "apollo-server-express";

// typeDefs: định nghĩa các trường dữ liệu mà cho phép fontend lấy
export const typeDefsArticle = gql` 
        # định nghĩa những trường thông tin cho phép lấy về
        type Article {
            id: ID,
            title: String,
            avatar: String,
            description: String,
            category: Category
        }

        # Query: viết những hàm cho phép truy vấn ra data
        type Query { 
            getListArticle(
                sortKey: String, 
                sortValue: String,
                currentPage: Int = 1,
                limitItems: Int = 2,
                filterKey: String,
                filterValue: String,
                keyword: String
            ): [Article],
            getArticle(id: ID): Article,
        }

        # định nghĩa những trường data cho phép gửi lên
        input ArticleInput {
            title: String,
            avatar: String,
            description: String,
            categoryId: String
        }

        #Mutation: viết những hàm cho phép gửi data lên, để thêm sửa xoá data 
        type Mutation {
            createArticle(article: ArticleInput): Article,
            updateArticle(id: ID, article: ArticleInput): Article,
            deleteArticle(id: ID): String,
        }
    `
;
require('dotenv').config()
const express = require('express')
const { DataTypes, Model, Sequelize } = require('sequelize')

const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false })

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
)

const main = async () => {
  const blogs = await Blog.findAll()

  console.log(
    blogs.map((b) => `${b.author}: '${b.title}', ${b.likes} likes`).join('\n')
  )
}

main()

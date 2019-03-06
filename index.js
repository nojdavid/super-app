const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    posts(root, args, context) {
      return context.prisma.posts({ where: { title_contains: args.title } })
    },
    post(root, args, context) {
      return context.prisma.post({ id: args.postId })
    }
  },
  Mutation: {
    async signup(root, args, context, info) {
      const password = await bcrypt.hash(args.password, 10)
      const user = await context.prisma.createUser({
        name: args.email,
        email: args.email,
        password,
      })

      return {
        token: jwt.sign({ userId: user.id }, 'shhhhh'),
        user,
      }
    },
    async login(root, { email, password }, context, info) {
      const user = await context.prisma.user({email})
      if (!user) {
        throw new Error(`No such user found for email: ${email}`)
      }

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }

      return {
        token: jwt.sign({ userId: user.id }, 'shhhhh'),
        user,
      }
    },
    createPost(root, args, context) {
      return context.prisma.createPost(
        {
          title: args.title,
          author: {
            connect: { id: args.userId }
          }
        },

      )
    },
  },
  User: {
    posts(root, args, context) {
      return context.prisma.user({
        id: root.id
      }).posts()
    }
  },
  Post: {
    author(root, args, context) {
      return context.prisma.post({
        id: root.id
      }).author()
    }
  },
  AuthPayload: {
    user: async ({ user: { id } }, args, context, info) => {
      return context.prisma.user({
        id: id
      })
    },
  }
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma
  },
})
server.start(() => console.log('Server is running on http://localhost:4000'))
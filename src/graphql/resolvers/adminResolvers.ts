import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql"; 
import { ApolloServerErrorCode } from "@apollo/server/errors";

import { config as jwtConfig } from "../../config/jwt";
import generateToken from "../../helpers/generateToken";

export const resolvers = {
  Query: {
    async admins(_, __, contextValue) {
      return await contextValue.adminRepository.find();
    },
    async admin(_, { id }, contextValue) {
      return await contextValue.adminRepository.findOne({ where: { id } });
    }
  },
  Mutation: {
    async signupAdmin(_, { name, email, password }, contextValue) {
      const adminExists = await contextValue.adminRepository.findOne({ where: { email } });
      if (adminExists) {
        throw new GraphQLError("Admin already exists", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
        });
      }
      const admin = contextValue.adminRepository.create({
        name,
        email,
        password
      });
      admin.verificationToken = generateToken();
      admin.isAdmin = true;
      await contextValue.adminRepository.save(admin);
      return admin;
    },
    async loginAdmin(_, { email, password }, contextValue) {
      const admin = await contextValue.adminRepository.findOne({ where: { email } });
      if (!admin) {
        throw new GraphQLError("Admin not found", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
        });
      }
      if (!admin.hasAdminAccess) {
        throw new GraphQLError("Admin does not have access. Ask the system admin for grant your access", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
        });
      }
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        throw new GraphQLError("Invalid password", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
        });
      }
      const loginToken = jwt.sign({ id: admin.id }, jwtConfig.secret, jwtConfig.signOptions);
      return {
        token: loginToken,
        admin: admin
      };
    },
    async grantAdminAccess(_, { id }, contextValue) {
      const admin = await contextValue.adminRepository.findOne({ where: { id } });
      if (!admin) {
        throw new GraphQLError("Admin not found", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
        });
      }
      admin.hasAdminAccess = true;
      await contextValue.adminRepository.save(admin);
      return admin;
    },
    async updateAdmin(_, { id, name, email, password }, contextValue) {
      const admin = await contextValue.adminRepository.findOne({ where: { id } });
      if (!admin) {
        throw new GraphQLError("Admin not found", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
        });
      }
      admin.name = name;
      admin.email = email;
      admin.password = password;
      await contextValue.adminRepository.save(admin);
      return admin;
    },
    async deleteAdmin(_, { id }, contextValue) {
      const admin = await contextValue.adminRepository.findOne({ where: { id } });
      if (!admin) {
        throw new GraphQLError("Admin not found", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
        });
      }
      await contextValue.adminRepository.delete(admin);
      return admin;
    }
  }
}

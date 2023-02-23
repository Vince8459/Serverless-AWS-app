import { TodosAccess } from '../dataLayer/todosAcess'
// import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
//import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'

// TODO: Implement businessLogic
const logger = createLogger('TodosAccess')
// const attachmentUtils = new AttachmentUtils()
const todosAccess = new TodosAccess()

const s3BucketName = process.env.ATTACHMENT_S3_BUCKET


//write Get todo function
export async function getTodosForUser(userId: string): Promise<TodoItem[]>{
    logger.info('Get todos function is called')
    return await todosAccess.getAllTodos(userId)
}

//write Create todo function
export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    userId: string
): Promise<TodoItem>{
    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()
    const newItem = {
        userId,
        todoId,
        createdAt,
        done: false,
        attachmentUrl: `https://${s3BucketName}.s3.amazonaws.com/${todoId}`,
        ...createTodoRequest
    }
    logger.info('Create todo item called')
    return await todosAccess.createTodoItem(newItem)
}

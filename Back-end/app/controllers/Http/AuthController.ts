import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

public async register({ request, auth }: HttpContextContract) {
      const {email, password}= request.only(['email', 'password'])
      const toke= await auth.use('api').attempt(email, password)
      return token
}
}


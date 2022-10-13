import { Injectable,Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor( 
  @Inject("USER_REPOSITORY")
  private usersRepository: Repository<User>){}

  async Listar(): Promise<User[]>{
    return this.usersRepository.find();
  }



  private users: User[]=[]
  create(createUserDto: CreateUserDto) {
    const idMaxAtual = this.users[this.users.length -1]?. id || 0;
    const id = idMaxAtual + 1;
    const user = {
      id,
      ...createUserDto
    };
    this.users.push(user)
    return '';
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) 
  { const index = this.users.findIndex((user)=> user.id===id)
    return this.users[index]
   // return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user= this.findOne(id)
    const newUser ={
      ...user ,
      ... updateUserDto,
    }
      const index = this.users.findIndex((user) => user.id === id)
      this.users[index] = newUser
    
    return newUser;
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id)

    if (index === -1){
      throw new NotFoundException(`Usuário com o id ${id} não encontrado`) // excecao quando algo não for encontrado  em http

    }
    this.users.splice(index,1);
  }
}

import { CreatePostDto } from './../dtos/create-post.dto';
import { UsersService } from './../../users/providers/users.service';
import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    // Create the post
    let post = this.postsRepository.create({
      ...createPostDto,
    });

    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    let posts = await this.postsRepository.find({});

    return posts;
  }

  public async delete(id: number) {
    await this.postsRepository.findOneBy({ id });

    return { deleted: true, id };
  }
}

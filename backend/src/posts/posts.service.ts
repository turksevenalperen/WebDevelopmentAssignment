import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      userId: 1,
      title: 'Getting Started with React Development',
      body: 'React is a powerful JavaScript library for building user interfaces. In this post, we will explore the fundamental concepts of React, including components, state management, and the virtual DOM. Whether you are a beginner or looking to refresh your knowledge, this guide will help you understand the core principles.',
    },
    {
      id: 2,
      userId: 1,
      title: 'Understanding TypeScript Benefits',
      body: 'TypeScript brings static typing to JavaScript, making your code more robust and maintainable. With features like type checking, intellisense, and better refactoring capabilities, TypeScript has become an essential tool for modern web development. Learn how to leverage these benefits in your next project.',
    },
    {
      id: 3,
      userId: 1,
      title: 'Building Modern Web Applications',
      body: "Modern web development requires a solid understanding of various technologies and frameworks. From responsive design principles to performance optimization, this article covers the essential skills needed to create fast, accessible, and user-friendly web applications in today's competitive landscape.",
    },
    {
      id: 4,
      userId: 2,
      title: 'Backend Development with NestJS',
      body: 'NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. With its modular architecture, dependency injection, and TypeScript support, NestJS provides developers with powerful tools to create robust APIs and microservices.',
    },
    {
      id: 5,
      userId: 2,
      title: 'Database Design Best Practices',
      body: 'Effective database design is crucial for application performance and scalability. This post covers normalization techniques, indexing strategies, and relationship modeling. Understanding these concepts will help you build databases that can handle growing data requirements efficiently.',
    },
  ];

  private nextId = 6;

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  findByUserId(userId: number): Post[] {
    return this.posts.filter((post) => post.userId === userId);
  }

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.nextId++,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updatePostDto,
    };
    return this.posts[postIndex];
  }

  remove(id: number): void {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    this.posts.splice(postIndex, 1);
  }
}

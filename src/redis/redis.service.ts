import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';
import { Inject } from '@nestjs/common';
import type { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly client: RedisClientType,
  ) {}

  getClient() {
    return this.client;
  }

  // convenience wrappers
  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number) {
    if (ttl)
      return this.client.set(key, value, { EX: ttl });
    return this.client.set(key, value);
  }

  async delete(key: string) {
    return this.client.del(key);
  }

}

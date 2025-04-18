// src/cache/cache.service.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    try {
      this.logger.debug(`Fetching cache for key: ${key}`);
      return await this.cacheManager.get<T>(key);
    } catch (error) {
      this.logger.error(`Failed to get cache for key ${key}: ${error.message}`);
      return undefined;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      this.logger.debug(`Setting cache for key: ${key}`);
      await this.cacheManager.set(key, value, ttl);
    } catch (error) {
      this.logger.error(`Failed to set cache for key ${key}: ${error.message}`);
    }
  }

  async del(key: string): Promise<void> {
    try {
      this.logger.debug(`Deleting cache for key: ${key}`);
      await this.cacheManager.del(key);
    } catch (error) {
      this.logger.error(`Failed to delete cache for key ${key}: ${error.message}`);
    }
  }

  generateCacheKey(prefix: string, params: Record<string, any>): string {
    const paramString = Object.entries(params)
      .map(([key, value]) => `${key}:${value}`)
      .join('_');
    return `${prefix}_${paramString}`;
  }
}
import { createModuleDecorator } from '@imeepos/core';
import { join } from 'path';
export const v1 = createModuleDecorator('@imeepos/admin');
export const staticRoot = join(__dirname, '../static');

import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { staticGET: GET } = createFromSource(source);

// statically cached
export const getConfig = async () => ({
  render: 'static',
});
import { dataToProtobuffer } from '#/utils/dataUtils'
import { QueryCurrRegionHttpRsp } from '@/types/dispatch/curRegion'
import { fileExists, readFile } from '@/utils/fileSystem'
import { getEc2bKey } from '@/utils/mhyCrypto/ec2b'
import { join } from 'path'
import { cwd } from 'process'

export async function dumpEc2bKey(version: string, name: string): Promise<Buffer> {
  const binPath = join(cwd(), `data/bin/${version}/${name}.bin`)

  if (!await fileExists(binPath)) throw new Error('Missing bin file')

  const curRegionRsp: QueryCurrRegionHttpRsp = await dataToProtobuffer(await readFile(binPath), name, true)
  return getEc2bKey(Buffer.from(curRegionRsp.clientSecretKey))
}
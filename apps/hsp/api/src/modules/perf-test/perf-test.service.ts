import { Injectable } from '@nestjs/common'
import data from 'src/../storage/perf-test/generic_data.json'
import { sleep } from 'src/_utils/sleep'

@Injectable()
export class PerfTestService {
  async findAll(delay: number = 0): Promise<any> {
    if (delay) {
      await sleep(delay)
    }
    return data
  }

  async findOne(section: string, delay: number = 0): Promise<any> {
    if (delay) {
      await sleep(delay)
    }
    return data[section]
  }
}

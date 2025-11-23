import { Injectable } from '@nestjs/common'
import data from 'src/../storage/perf-test/generic_data.json'
import { sleep } from 'src/_utils/sleep'

export interface MockLoginResponse {
  id: number
  username: string
  avatarUrl: string
}

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

  async loginInfo(delay: number = 0): Promise<MockLoginResponse> {
    if (delay) {
      await sleep(delay)
    }
    return {
      id: 1,
      username: 'mock_user',
      avatarUrl: 'https://i.pravatar.cc/150?img=67',
    }
  }
}

import { Test, TestingModule } from '@nestjs/testing'
import { PerfTestController } from './perf-test.controller'
import { PerfTestService } from './perf-test.service'

describe('PerfTestController', () => {
  let controller: PerfTestController
  let service: PerfTestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfTestController],
      providers: [PerfTestService],
    }).compile()

    controller = module.get<PerfTestController>(PerfTestController)
    service = module.get<PerfTestService>(PerfTestService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAll', () => {
    it('should return all data', async () => {
      const result = { data: 'all' }
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(async () => Promise.resolve(result))
      expect(await controller.findAll('0')).toBe(result)
    })

    it('should apply delay', async () => {
      const start = Date.now()
      await controller.findAll('100')
      const end = Date.now()
      expect(end - start).toBeGreaterThanOrEqual(100)
    })
  })

  const sections = [
    'hashTags',
    'banners',
    'subBanner',
    'timeLines',
    'streaming',
    'newNavis',
    'rankings',
    'interviewVideos',
    'saleOffToolProducts',
    'newFaces',
    'newProducts',
  ]

  sections.forEach((section) => {
    describe(`find${section.charAt(0).toUpperCase() + section.slice(1)}`, () => {
      it(`should return ${section} data`, async () => {
        const result = { data: section }
        jest
          .spyOn(service, 'findOne')
          .mockImplementation(async () => Promise.resolve(result))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const controllerMethod =
          controller[
            `find${section.charAt(0).toUpperCase() + section.slice(1)}`
          ]
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        expect(await controllerMethod.call(controller, '0')).toBe(result)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(service.findOne).toHaveBeenCalledWith(section, 0)
      })
    })
  })
})

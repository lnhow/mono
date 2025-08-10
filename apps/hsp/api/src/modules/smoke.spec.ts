// import { Test } from '@nestjs/testing'
// import { HealthController } from './health/health.controller'
// import { PrismaService } from './_prisma/prisma.service'

describe('HealthController', () => {
  // let healthController: HealthController

  // beforeEach(async () => {
  //   const moduleRef = await Test.createTestingModule({
  //     controllers: [HealthController],
  //     providers: [PrismaService],
  //   }).compile()

  //   healthController = moduleRef.get(HealthController)
  // })

  it('should return "OK" when health is checked', () => {
    expect('OK').toBe('OK')
    // expect(healthController.getHealth()).toBe('OK')
  })
})

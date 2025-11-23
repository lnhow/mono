import { Controller, Get, Query } from '@nestjs/common'
import { PerfTestService } from './perf-test.service'
import { ApiQuery } from '@nestjs/swagger'

@Controller('perf-test')
export class PerfTestController {
  constructor(private readonly perfTestService: PerfTestService) {}

  @Get()
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findAll(@Query('delay') delay: string = '0') {
    return this.perfTestService.findAll(parseInt(delay, 10) || 0)
  }

  @Get('hashTags')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findHashTags(@Query('delay') delay: string = '0') {
    return this.perfTestService.findOne('hashTags', parseInt(delay, 10) || 0)
  }

  @Get('banners')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findBanners(@Query('delay') delay: string = '0') {
    return this.perfTestService.findOne('banners', parseInt(delay, 10) || 0)
  }

  @Get('subBanner')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findSubBanner(@Query('delay') delay: string = '0') {
    return this.perfTestService.findOne('subBanner', parseInt(delay, 10) || 0)
  }

  @Get('timeLines')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findTimeLines(@Query('delay') delay: string = '0') {
    return this.perfTestService.findOne('timeLines', parseInt(delay, 10) || 0)
  }

  @Get('streaming')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findStreaming(@Query('delay') delay: string = '0') {
    return this.perfTestService.findOne('streaming', parseInt(delay, 10) || 0)
  }

  @Get('newNavis')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findNewNavis(@Query('delay') delay: string = '0') {
    return this.perfTestService.findOne('newNavis', parseInt(delay, 10) || 0)
  }

  @Get('rankings')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findRankings(@Query('delay') delay: string = '0') {
    return this.perfTestService.findOne('rankings', parseInt(delay, 10) || 0)
  }

  @Get('interviewVideos')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findInterviewVideos(@Query('delay') delay: string = '0') {
    return this.perfTestService.findOne(
      'interviewVideos',
      parseInt(delay, 10) || 0,
    )
  }

  @Get('saleOffToolProducts')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findSaleOffToolProducts(@Query('delay') delay: string = '0') {
    return this.perfTestService.findOne(
      'saleOffToolProducts',
      parseInt(delay, 10) || 0,
    )
  }

  @Get('newFaces')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findNewFaces(@Query('delay') delay: string) {
    return this.perfTestService.findOne('newFaces', parseInt(delay, 10) || 0)
  }

  @Get('newProducts')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findNewProducts(@Query('delay') delay: string) {
    return this.perfTestService.findOne('newProducts', parseInt(delay, 10) || 0)
  }

  @Get('recommends')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findRecommends(@Query('delay') delay: string) {
    return this.perfTestService.findOne('recommends', parseInt(delay, 10) || 0)
  }

  @Get('prProducts')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  findPrProducts(@Query('delay') delay: string) {
    return this.perfTestService.findOne('prProducts', parseInt(delay, 10) || 0)
  }

  @Get('login-info')
  @ApiQuery({ name: 'delay', required: false, type: Number })
  getLoginInfo(@Query('delay') delay: string) {
    return this.perfTestService.loginInfo(parseInt(delay, 10) || 0)
  }
}

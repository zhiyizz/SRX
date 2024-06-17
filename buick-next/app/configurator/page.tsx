import { getSeries } from '@utils/libs'
import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import Configurator from './build'
import type { Metadata } from 'next'

export async function generateMetadata({ searchParams }: { searchParams: { series: string } }): Promise<Metadata> {
  const { isEnabled } = draftMode()

  const sd = await getSeries(isEnabled)
  const currentSeries = sd.find(s => !s.flags?.mock && s.code === searchParams.series)

  if (currentSeries) {
    return {
      title: `配置别克${currentSeries.displayName || currentSeries.name}`
    }
  }

  return {
    title: '404',
  }
}

export default async function BuildPage({ searchParams }: {
  searchParams: { series: string | undefined }
}) {
  if (!searchParams.series) {
    redirect('/')
  }

  const { isEnabled } = draftMode()

  const series = await getSeries(isEnabled)
  const currentSeries = series.find(s => !s.flags?.mock && (s.code === searchParams.series))

  if (!currentSeries) {
    notFound()
  }
  if (!currentSeries.flags?.configurator) {
    redirect(`/${currentSeries.url || currentSeries.code}`)
  }

  return <Configurator code={currentSeries.code} seriesId={String(currentSeries.carID || currentSeries.carId)} />
}

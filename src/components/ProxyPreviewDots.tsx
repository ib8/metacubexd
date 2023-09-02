import { For } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { latencyQualityMap, useProxies } from '~/signals'

const DelayDots = (p: { delay: number | undefined; selected: boolean }) => {
  let dotClassName = p.selected
    ? 'bg-white border-4 border-success'
    : 'bg-success'

  if (
    typeof p.delay !== 'number' ||
    p.delay === latencyQualityMap().NOT_CONNECTED
  ) {
    dotClassName = p.selected
      ? 'bg-white border-4 border-neutral'
      : 'bg-neutral'
  } else if (p.delay > latencyQualityMap().HIGH) {
    dotClassName = p.selected ? 'bg-white border-4 border-error' : 'bg-error'
  } else if (p.delay > latencyQualityMap().MEDIUM) {
    dotClassName = p.selected
      ? 'bg-white border-4 border-warning'
      : 'bg-warning'
  }

  return <div class={twMerge('m-1 h-4 w-4 rounded-full', dotClassName)}></div>
}

export const ProxyPreviewDots = (props: {
  proxyNameList: string[]
  now?: string
}) => {
  const { latencyMap } = useProxies()

  return (
    <div class="flex w-full flex-wrap items-center">
      <For
        each={props.proxyNameList.map((name): [string, number] => [
          name,
          latencyMap()[name],
        ])}
      >
        {([name, delay]) => {
          const isSelected = props.now === name

          return <DelayDots delay={delay} selected={isSelected} />
        }}
      </For>
    </div>
  )
}

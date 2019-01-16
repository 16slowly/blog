/**
 * @see https://github.com/vivedu/VIVEDU-Homepage/issues/43
 */

import React from 'react'

const DURATION = 5000

class Carousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      previousIndex: -1,
      currentIndex: 0,
    }
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  show = (index) => {
    const { slides } = this.props
    const length = slides.length

    let next = index
    next %= length

    this.setState({
      previousIndex: this.state.currentIndex,
      currentIndex: next,
    })
    this.start()
  }

  start = () => {
    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this.show(this.state.currentIndex + 1)
      this.start()
    }, DURATION)
  }

  render() {
    const {
      className,
      indicatorClassName,
      slides,
      indicator: Indicator,
      transition,
      reversedTransition,
    } = this.props
    const { currentIndex, previousIndex } = this.state

    return (
      <div className={className}>
        {slides.map((slide, index) => {
          const Transition =
            currentIndex > previousIndex
              ? transition
              : reversedTransition || transition

          return (
            <Transition
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              status={
                (currentIndex === index && 'enter') ||
                (previousIndex === index && 'leave')
              }
            >
              {slide}
            </Transition>
          )
        })}
        <Indicator
          className={indicatorClassName}
          length={slides.length}
          currentIndex={currentIndex}
          onClick={index => this.show(index)}
        />
      </div>
    )
  }
}

export default Carousel

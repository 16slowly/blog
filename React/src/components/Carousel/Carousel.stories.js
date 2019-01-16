import React from 'react'
import { storiesOf } from '@storybook/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions'
import SlideInFromLeftWithMask from 'animations/SlideInFromLeftWithMask'
import SlideOutFromRightWithMask from 'animations/SlideOutFromRightWithMask'
import Fade from 'animations/Fade'
import Carousel from './Carousel'
import { CardIndicator, BarIndicator, RectangleIndicator } from './Indicator'
import styles from './Carousel.stories.scss'

const slides = ['one', 'two', 'three', 'four', 'five'].map((slide, index) => (
  <div
    // eslint-disable-next-line react/no-array-index-key
    key={index}
    className={styles.slide}
  >
    <div className={styles.text}>{slide}</div>
  </div>
))

const fadeAnimationSlides = [
  'http://static-oss.vivedu.com/home/banner/design.min.jpg',
  'http://static-oss.vivedu.com/home/banner/metalwork.min.jpg',
  'http://static-oss.vivedu.com/home/banner/media.min.jpg',
  'http://static-oss.vivedu.com/home/banner/k12.min.jpg',
  'http://static-oss.vivedu.com/home/banner/safety.min.jpg',
  // eslint-disable-next-line react/no-array-index-key
].map((slide, index) => <img key={index} src={slide} alt="" />)

storiesOf('Carousel', module)
  .add('Indicator', () => (
    <div className={styles.indicators}>
      <h1>CardIndicator: </h1>
      <CardIndicator
        className={styles.indicator}
        length={5}
        currentIndex={0}
        onClick={action('CardIndicator clicked')}
      />
      <h1>BarIndicator: </h1>
      <BarIndicator
        className={styles.indicator}
        length={5}
        currentIndex={1}
        onClick={action('BarIndicator clicked')}
      />
      <h1>RectangleIndicator: </h1>
      <RectangleIndicator
        className={styles.indicator}
        length={5}
        currentIndex={3}
        onClick={action('RectangleIndicator clicked')}
      />
    </div>
  ))
  .add('Carousel with Slide animation', () => (
    <Carousel
      className={styles.carousel}
      indicatorClassName={styles.indicator}
      slides={slides}
      indicator={CardIndicator}
      transition={SlideOutFromRightWithMask}
      reversedTransition={SlideInFromLeftWithMask}
    />
  ))
  .add('Carousel with Fade animation', () => (
    <Carousel
      className={styles.carousel}
      indicatorClassName={styles.indicator}
      slides={fadeAnimationSlides}
      indicator={BarIndicator}
      transition={Fade}
    />
  ))

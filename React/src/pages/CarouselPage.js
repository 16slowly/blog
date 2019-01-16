import React from 'react'
import { Link } from 'react-router-dom'
import SlideInFromLeftWithMask from 'animations/SlideInFromLeftWithMask'
import SlideOutFromRightWithMask from 'animations/SlideOutFromRightWithMask'
import Fade from 'animations/Fade'
import Carousel, { CardIndicator, BarIndicator } from 'components/Carousel'
import styles from './CarouselPage.scss'

const slides = [
  // eslint-disable-next-line global-require
  require('assets/images/fj1.jpeg'),
  // eslint-disable-next-line global-require
  require('assets/images/fj2.jpeg'),
  // eslint-disable-next-line global-require
  require('assets/images/fj3.jpeg'),
  // eslint-disable-next-line global-require
  require('assets/images/fj4.jpeg'),
  // eslint-disable-next-line react/no-array-index-key, global-require
].map((slide, index) => <img key={index} src={slide} alt="" />)

export default () => (
  <div className="container">
    <div className={styles.title}>
      <h1>Carousel 轮播</h1>
      <Link className={styles.goback} to="/">&lt; 返回首页</Link>
    </div>
    <div>
      <Carousel
        className={styles.carousel}
        indicatorClassName={styles.indicator}
        slides={slides}
        indicator={BarIndicator}
        transition={Fade}
      />
      <Carousel
        className={styles.carousel}
        indicatorClassName={styles.indicator}
        slides={slides}
        indicator={CardIndicator}
        transition={SlideOutFromRightWithMask}
        reversedTransition={SlideInFromLeftWithMask}
      />
    </div>
  </div>
)

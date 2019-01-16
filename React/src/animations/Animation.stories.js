import React from 'react'
import { storiesOf } from '@storybook/react'
import SlideInFromLeftWithMask from './SlideInFromLeftWithMask'
import SlideOutFromRightWithMask from './SlideOutFromRightWithMask'
import Fade from './Fade'
import styles from './Animation.stories.scss'

storiesOf('Animation', module)
  .add('SlideInFromLeftWithMask', () => (
    <div>
      <h1>SlideInFromLeftWithMask leave</h1>
      <div className={styles.container}>
        <SlideInFromLeftWithMask status={'leave'}>
          <div className={styles.slide}>
            <div className={styles.text}>SlideInFromLeftWithMask</div>
          </div>
        </SlideInFromLeftWithMask>
      </div>
      <h1>SlideInFromLeftWithMask enter</h1>
      <div className={styles.container}>
        <SlideInFromLeftWithMask status={'enter'}>
          <div className={styles.slide}>
            <div className={styles.text}>SlidePopIn</div>
          </div>
        </SlideInFromLeftWithMask>
      </div>
    </div>
  ))
  .add('SlideOutFromRightWithMask', () => (
    <div>
      <h1>SlideOutFromRightWithMask leave</h1>
      <div className={styles.container}>
        <SlideOutFromRightWithMask status={'leave'}>
          <div className={styles.slide}>
            <div className={styles.text}>SlideOutFromRightWithMask</div>
          </div>
        </SlideOutFromRightWithMask>
      </div>
      <h1>SlideOutFromRightWithMask enter</h1>
      <div className={styles.container}>
        <SlideInFromLeftWithMask status={'enter'}>
          <div className={styles.slide}>
            <div className={styles.text}>SlidePopIn</div>
          </div>
        </SlideInFromLeftWithMask>
      </div>
    </div>
  ))
  .add('Fade', () => (
    <div>
      <h1>FadeIn</h1>
      <div className={styles.container}>
        <Fade status={'enter'}>
          <div className={styles.slide}>
            <div className={styles.text}>FadeIn</div>
          </div>
        </Fade>
      </div>
      <h1>FadeOut</h1>
      <div className={styles.container}>
        <Fade status={'leave'}>
          <div className={styles.slide}>
            <div className={styles.text}>FadeOut</div>
          </div>
        </Fade>
      </div>
    </div>
  ))

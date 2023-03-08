import { Carousel } from '@itwin/itwinui-react';
import React from 'react';

const App = () => {
  const [index, setIndex] = React.useState(0);

  const handleOnKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setIndex((prev) => prev - 1);
    } else if (e.key === 'ArrowRight') {
      setIndex((prev) => prev + 1);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('keydown', handleOnKeyDown);

    return () => {
      window.removeEventListener('keydown', handleOnKeyDown);
    };
  }, [handleOnKeyDown]);

  return (
    <>
      <Carousel activeSlideIndex={index}>
        <Carousel.Slider>
          {[...Array(50)].map((_, index) => (
            <Carousel.Slide key={index}>
              {
                <div
                  style={{
                    height: 250,
                    display: 'grid',
                    placeItems: 'center',
                    border: 'solid 1px',
                  }}
                >
                  {index}
                </div>
              }
            </Carousel.Slide>
          ))}
        </Carousel.Slider>
        <Carousel.Navigation />
      </Carousel>
    </>
  );
};

export default App;

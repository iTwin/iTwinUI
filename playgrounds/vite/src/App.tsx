import * as React from 'react';
import { Button, ButtonGroup, Text } from '@itwin/itwinui-react';

type VisiblePageIndices = [number, number];
// | [null, number, number]
// | [number, number, null]
// | null;

export default function App() {
  // const [addClass, setAddClass] = React.useState(false);

  // const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

  const pagesIndexes = React.useMemo(
    () => [...Array(10)].map((_, index) => index),
    [],
  );
  const pageRefs = React.useRef<Record<string, HTMLElement | null>>({});

  // const [visiblePageIndexes, setVisiblePageIndexes] =
  //   React.useState<VisiblePageIndices>(null);

  // const [animationData, setAnimationData] = React.useState<
  //   [React.CSSProperties, React.CSSProperties][] | null
  // >(null);

  // Reducer where all the component-wide state is stored
  const [{ currentPageId, animations }, dispatch] = React.useReducer(
    pageAnimationReducer,
    {
      currentPageId: 'page-8',
      animations: null,
      animationDirection: null,
      animatingToPageId: null,
    } as PageAnimationState,
  );

  const goToPage = async (direction: 'prev' | 'next') => {
    // // Page transition already in progress
    // if (visiblePageIndexes !== null) {
    //   return;
    // }

    // Page transition already in progress
    if (animations != null) {
      return;
    }

    const currentPageIndex = Number(currentPageId.slice('page-'.length));
    const otherPageIndex =
      direction === 'next' ? currentPageIndex + 1 : currentPageIndex - 1;
    const otherPageId = `page-${otherPageIndex}`;

    // const currentPage = pageRefs[currentPageIndex];
    // const otherPage = pageRefs[otherPageIndex];

    const animationOptions = {
      duration: 1000,
      iterations: 1,
      easing: 'ease-out',
    };

    // setVisiblePageIndexes(
    //   direction === 'next'
    //     ? [null, currentPageIndex, otherPageIndex]
    //     : [otherPageIndex, currentPageIndex, null],
    // );

    const animationsData = {
      [currentPageId]:
        direction === 'next'
          ? [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }]
          : [{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }],
      [otherPageId]:
        direction === 'next'
          ? [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }]
          : [
              { transform: 'translateX(0)', display: 'block' },
              { transform: 'translateX(100%)', display: 'block' },
            ],
    };

    dispatch({
      type: (direction === 'prev' ? 'left' : 'right') as 'left',
      animatingToPageId: `page-${otherPageIndex}`,
      animations: animationsData,
    });

    await Promise.all(
      Object.entries(animationsData).map(([pageId, keyframes], index) => {
        const element = pageRefs.current[pageId];

        return new Promise((resolve, reject) => {
          if (element == null) {
            resolve(null);
            return;
          }

          // console.log('animating', pageId);

          const animation = element.animate(keyframes, animationOptions);

          if (animation) {
            animation.onfinish = () => {
              // onFinish(currentPageIndex + index);
              resolve(null);
            };
          }
        });
      }),
    );

    // const currentPageAnimation = currentPage.current.animate(
    //   [
    //     { transform: 'translateX(0%)' },
    //     { transform: 'translateX(-100%)', display: 'none' },
    //   ],
    //   animationOptions
    // );

    // const nextPageAnimation = nextPage.current.animate(
    //   [{ transform: 'translateX(100%)' }, { transform: 'translateX(0%)' }],
    //   animationOptions
    // );

    // setTimeout(() => {
    dispatch({ type: 'endAnimation' });
    //   console.log("J'suis là");

    //   // setCurrentPageIndex(otherPageIndex);
    //   // // setCurrentPageIndex((prev) => prev + 1);
    //   // setVisiblePageIndexes(null);
    // }, 3000);
  };

  return (
    <>
      <div
        style={{
          border: '1px solid red',
          width: '300px',
          overflow: 'hidden',
        }}
        // onAnimationStart={(e) => console.log(e)}
        // onAnimationStartCapture={(e) => console.log(e)}
        // onAnimationEnd={(event) => {
        //   console.log(event);
        // }}
      >
        <Text>currentPage = {currentPageId}</Text>
        <ButtonGroup>
          <Button onClick={() => goToPage('prev')}>-1</Button>
          <Button onClick={() => goToPage('next')}>+1</Button>
        </ButtonGroup>

        <div
          className='page-wrapper'
          style={{
            height: '200px',
          }}
        >
          {pagesIndexes.map((index) => (
            <Page
              key={index}
              index={index}
              currentPageId={currentPageId}
              animations={animations}
              pageRefs={pageRefs}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// ----

const Page = ({
  index,
  currentPageId,
  animations,
  pageRefs,
}: {
  index: number;
  currentPageId: PageAnimationState['currentPageId'];
  animations: PageAnimationState['animations'];
  pageRefs: React.RefObject<Record<string, HTMLElement | null>>;
}) => {
  const pageId = `page-${index}`;

  const ref = React.useRef(null);
  if (pageRefs.current) {
    pageRefs.current[`page-${index}`] = ref.current;
  }

  if (pageId === 'page-5') {
    console.log(
      animations == null
        ? pageId !== currentPageId
        : !Object.keys(animations).includes(pageId),
    );
  }

  return (
    <div
      ref={ref}
      id={pageId}
      className='page'
      hidden={
        animations == null
          ? pageId !== currentPageId
          : !Object.keys(animations).includes(pageId)
      }
      style={{
        inlineSize: '100%',
        // display: index === currentIndex ? 'flex' : undefined,
        // alignItems: 'center',
        // justifyContent: 'center',
        // display:
        //   visiblePageIndexes?.[0] === currentIndex ||
        //   (visiblePageIndexes?.[1] === currentIndex &&
        //     visiblePageIndexes?.[2] != null)
        //     ? 'none'
        //     : undefined,

        border: '1px solid hotpink',

        ...(pageId === currentPageId &&
        animations != null &&
        animations[pageId] != null
          ? animations[pageId][animations[pageId].length - 1]
          : {}),
      }}
      // onAnimationEnd={(event) => {
      //   console.log(event);
      // }}
    >
      <span
        style={{
          display: 'block',
          transform: 'translateX(100px)',
        }}
      >
        {index}
      </span>
    </div>
  );
};

// type AnimationData = {
//   element: HTMLElement | null;
//   keyframes: React.CSSProperties[];
// };

type PageAnimationState = {
  currentPageId: string;
  animatingToPageId: string | null;
  animationDirection: 'left' | 'right' | null;
  animations: Record<string, React.CSSProperties[]> | null;
};

type PageAnimationAction =
  | {
      type: 'left';
      animatingToPageId: string;
      animations: PageAnimationState['animations'];
    }
  | {
      type: 'right';
      animatingToPageId: string;
      animations: PageAnimationState['animations'];
    }
  | { type: 'endAnimation' };

export const pageAnimationReducer = (
  state: PageAnimationState,
  action: PageAnimationAction,
): PageAnimationState => {
  switch (action.type) {
    case 'left':
    case 'right': {
      // Animation already in progress or other page doesn't exist
      if (
        state.animatingToPageId != null ||
        document.querySelector(action.animatingToPageId)
      ) {
        return state;
      }

      return {
        ...state,
        animatingToPageId: action.animatingToPageId,
        animationDirection: action.type,
        animations: action.animations,
      };
    }
    case 'endAnimation': {
      // No animation in progress
      if (state.animatingToPageId == null) {
        return state;
      }

      return {
        ...state,
        currentPageId: state.animatingToPageId,
        animatingToPageId: null,
        animationDirection: null,
        animations: null,
      };
    }
    default: {
      return state;
    }
  }
};

// ----------------------------------------------------------------------------

// import {
//   Flex,
//   IconButton,
//   List,
//   ListItem,
//   Surface,
//   Text,
//   ToggleSwitch,
// } from '@itwin/itwinui-react';
// import * as React from 'react';
// import { useAtom, useAtomValue, useSetAtom, atom } from 'jotai';
// import { SvgChevronLeft } from '@itwin/itwinui-icons-react';
// import { flushSync } from 'react-dom';

// const App = () => {
//   const basePanelId = React.useId();
//   const qualityPanelId = React.useId();
//   const repeatId = React.useId();

//   // Note: Will not work, because BackButton currently relies on context.
//   const { goBack } = Panels.useInstance();

//   return (
//     <Surface style={{ display: 'inline-block' }}>
//       <Panels defaultActiveId={basePanelId}>
//         <Panel id={basePanelId}>
//           <List>
//             <ListItem>
//               <Flex>
//                 <label htmlFor={repeatId}>Repeat</label>
//                 <Flex.Spacer />
//                 <ToggleSwitch id={repeatId} />
//               </Flex>
//             </ListItem>
//             <ListItem>
//               <Panel.Trigger for={qualityPanelId}>
//                 <ListItem.Action>Quality</ListItem.Action>
//               </Panel.Trigger>
//             </ListItem>
//             <ListItem>Speed</ListItem>
//             <ListItem>Loop</ListItem>
//           </List>
//         </Panel>

//         <Panel id={qualityPanelId}>
//           <Surface.Header as={Panel.Header}>Quality</Surface.Header>
//           <List>
//             <ListItem>
//               <ListItem.Action
//                 onClick={() => {
//                   // setQuality('240p');
//                   goBack();
//                 }}
//               >
//                 240p
//               </ListItem.Action>
//             </ListItem>
//             <ListItem>360p</ListItem>
//             <ListItem>480p</ListItem>
//             <ListItem>720p</ListItem>
//             <ListItem>1080p</ListItem>
//           </List>
//         </Panel>
//       </Panels>
//     </Surface>
//   );
// };

// // ----------------------------------------------------------------------------

// const expandedIdAtom = atom<string | undefined>(undefined);
// const triggersAtom = atom(
//   new Map<string, { triggerId: string; panelId: string }>(),
// );

// const Panels = ({
//   children,
//   defaultActiveId,
// }: React.PropsWithChildren<any>) => {
//   const [expandedId, setExpandedId] = useAtom(expandedIdAtom);

//   if (expandedId === undefined) {
//     setExpandedId(defaultActiveId);
//   }

//   return <>{children}</>;
// };

// const Panel = ({ children, id, ...rest }: React.PropsWithChildren<any>) => {
//   const [expandedId] = useAtom(expandedIdAtom);
//   return (
//     <PanelIdContext.Provider value={id}>
//       <div id={id} hidden={id !== expandedId} {...rest}>
//         {children}
//       </div>
//     </PanelIdContext.Provider>
//   );
// };

// const PanelIdContext = React.createContext('');

// Panel.Header = ({ children, ...props }: React.PropsWithChildren<any>) => {
//   return (
//     <Flex {...props}>
//       <Panel.BackButton />
//       <Text
//         as='h2'
//         tabIndex={-1}
//         // TODO: Confirm that focus moves correctly to the Text after the next panel is opened.
//         // When a keyboard user triggers the panel, they should be able to continue tabbing into the panel.
//         // When a screen-reader user triggers the panel, they should hear the name of the panel announced.
//         //
//         // Alternate idea: maybe the Panel itself could be focused. But then the panel needs a role and a label.
//         ref={React.useCallback((el: HTMLElement | null) => el?.focus(), [])}
//       >
//         {children}
//       </Text>
//     </Flex>
//   );
// };

// Panel.BackButton = () => {
//   const setExpandedId = useSetAtom(expandedIdAtom);
//   const panelId = React.useContext(PanelIdContext);
//   const trigger = useAtomValue(triggersAtom).get(panelId);

//   const goBack = () => {
//     flushSync(() => setExpandedId(trigger?.panelId));

//     if (trigger?.triggerId) {
//       document.getElementById(trigger?.triggerId)?.focus();
//     }
//   };

//   return (
//     <IconButton
//       label='Back'
//       styleType='borderless'
//       onClick={goBack}
//       size='small'
//       data-iui-shift='left'
//     >
//       <SvgChevronLeft />
//     </IconButton>
//   );
// };

// Panels.useInstance = () => ({
//   goBack: () => {},
// });

// Panel.Trigger = ({
//   children: childrenProp,
//   for: forProp,
// }: React.PropsWithChildren<{ for: string }>) => {
//   const [expandedId, setExpandedId] = useAtom(expandedIdAtom);
//   const [triggers, setTriggers] = useAtom(triggersAtom);
//   const panelId = React.useContext(PanelIdContext);

//   const children = React.Children.only(childrenProp) as any;

//   const triggerFallbackId = React.useId();
//   const triggerId = children?.props?.id || triggerFallbackId;

//   if (triggers.get(forProp)?.triggerId !== triggerId) {
//     setTriggers(new Map(triggers.set(forProp, { triggerId, panelId })));
//   }

//   return (
//     React.isValidElement(children) &&
//     React.cloneElement(children, {
//       id: triggerId,
//       onClick: () => setExpandedId(forProp),
//       'aria-expanded': expandedId === forProp,
//       'aria-controls': forProp,
//     } as any)
//   );
// };

// export default App;

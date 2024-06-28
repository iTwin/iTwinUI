import * as React from 'react';
import { Button, ButtonGroup, Text } from '@itwin/itwinui-react';

export default function App() {
  // const [addClass, setAddClass] = React.useState(false);

  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

  const pagesIndexes = React.useMemo(
    () => [...Array(10)].map((_, index) => index),
    [],
  );
  const pageRefs: Array<React.RefObject<HTMLDivElement>> = [];

  const [visiblePageIndexes, setVisiblePageIndexes] = React.useState<
    [null, number, number] | [number, number, null] | null
  >(null);

  const nextPage = async () => {
    // Page transition already in progress
    if (visiblePageIndexes !== null) {
      return;
    }

    const currentPage = pageRefs[currentPageIndex];
    const nextPage = pageRefs[currentPageIndex + 1];

    const animationOptions = {
      duration: 1000,
      iterations: 1,
      easing: 'ease-out',
    };

    setVisiblePageIndexes([null, currentPageIndex, currentPageIndex + 1]);

    // const onFinish = (pageIndex: number) => {
    //   setVisiblePageIndexes((prev) => {
    //     if (prev.length === 2) {
    //       return prev.filter((i) => i != pageIndex) as [number];
    //     } else if (prev.length === 1) {
    //       return null;
    //     } else {
    //       return null;
    //     }
    //   });
    // };

    const animationsData = [
      {
        element: currentPage.current,
        keyframes: [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-100%)', display: 'none' },
        ],
      },
      {
        element: nextPage.current,
        keyframes: [
          { transform: 'translateX(100%)' },
          { transform: 'translateX(0)' },
        ],
      },
    ];

    await Promise.all(
      animationsData.map(
        (animationData, index) =>
          new Promise((resolve, reject) => {
            const animation = animationData.element?.animate(
              animationData.keyframes,
              animationOptions,
            );

            if (animation) {
              animation.onfinish = () => {
                // onFinish(currentPageIndex + index);
                resolve(null);
              };
            }
          }),
      ),
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

    console.log("J'suis là");

    setCurrentPageIndex((prev) => prev + 1);
    // setVisiblePageIndexes(null);
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
        <Text>currentPage = {currentPageIndex}</Text>
        <ButtonGroup>
          <Button onClick={() => setCurrentPageIndex((prev) => prev - 1)}>
            -1
          </Button>
          <Button onClick={nextPage}>+1</Button>
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
              visiblePageIndexes={visiblePageIndexes}
              currentIndex={currentPageIndex}
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
  currentIndex,
  visiblePageIndexes,
  pageRefs,
}: {
  index: number;
  currentIndex: number;
  visiblePageIndexes: [number, number] | [number] | null;
  pageRefs: React.RefObject<HTMLDivElement>[];
}) => {
  const ref = React.useRef(null);
  pageRefs[index] = ref;

  return (
    <div
      ref={ref}
      id={`page-${index}`}
      className='page'
      hidden={
        visiblePageIndexes == null
          ? index !== currentIndex
          : !visiblePageIndexes.includes(index)
      }
      style={{
        inlineSize: '100%',
        // display: index === currentIndex ? 'flex' : undefined,
        // alignItems: 'center',
        // justifyContent: 'center',
        border: '1px solid hotpink',
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

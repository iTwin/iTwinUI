import {
  Divider,
  Flex,
  List,
  ListItem,
  Panels,
  Surface,
  Text,
} from '@itwin/itwinui-react';
import React from 'react';
import { SvgShare } from '@itwin/itwinui-icons-react';

export default function Home() {
  return <MultiPanelInformationPanel />;
  // return <BasicDemo />;
}

const BasicDemo = () => {
  const basePanelId = React.useId();
  const repeatId = React.useId();
  const qualityPanelId = React.useId();
  const speedPanelId = React.useId();
  const accessibilityPanelId = React.useId();

  return (
    <>
      <Panels.Wrapper
        as={Surface}
        defaultActiveId={basePanelId}
        style={{
          inlineSize: '300px',
          blockSize: '500px',
        }}
      >
        <Panels.Panel as={List} id={basePanelId}>
          <ListItem>Repeat</ListItem>
          <ListItem>
            <Panels.Trigger for={qualityPanelId}>
              <ListItem.Action>Quality</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
          <ListItem>
            <Panels.Trigger for={speedPanelId}>
              <ListItem.Action>Speed</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
          <ListItem>
            <Panels.Trigger for={accessibilityPanelId}>
              <ListItem.Action>Accessibility</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
        </Panels.Panel>

        <Panels.Panel as={List} id={qualityPanelId}>
          <Surface.Header as={Panels.Header}>Quality</Surface.Header>
          <ListItem>240p</ListItem>
          <ListItem>360p</ListItem>
          <ListItem>480p</ListItem>
          <ListItem>720p</ListItem>
          <ListItem>1080p</ListItem>
        </Panels.Panel>

        {/* TODO: Remove the temp _iui3-menu class */}
        <Panels.Panel as={List} id={speedPanelId}>
          <Surface.Header as={Panels.Header}>Speed</Surface.Header>
          <Surface.Body
            style={{
              maxBlockSize: '100%',
              overflowY: 'auto',
            }}
          >
            <ListItem>0.2x</ListItem>
            <ListItem>0.3x</ListItem>
            <ListItem>0.4x</ListItem>
            <ListItem>0.5x</ListItem>
            <ListItem>0.6x</ListItem>
            <ListItem>0.7x</ListItem>
            <ListItem>0.8x</ListItem>
            <ListItem>0.9x</ListItem>
            <ListItem>1.0x</ListItem>
            <ListItem>1.1x</ListItem>
            <ListItem>1.2x</ListItem>
            <ListItem>1.3x</ListItem>
            <ListItem>1.4x</ListItem>
            <ListItem>1.5x</ListItem>
            <ListItem>1.6x</ListItem>
            <ListItem>1.7x</ListItem>
            <ListItem>1.8x</ListItem>
            <ListItem>1.9x</ListItem>
            <ListItem>2.0x</ListItem>
          </Surface.Body>
        </Panels.Panel>

        <Panels.Panel as={List} id={accessibilityPanelId}>
          <Surface.Header as={Panels.Header}>Accessibility</Surface.Header>
          <ListItem>High contrast</ListItem>
          <ListItem>Large text</ListItem>
          <ListItem>Screen reader</ListItem>
        </Panels.Panel>
      </Panels.Wrapper>
    </>
  );
};

const MultiPanelInformationPanel = () => {
  const basePanelId = 'base';

  const pages = Array.from(Array(10).keys()).map((i) => ({
    id: i,
    label: `Page ${i}`,
  }));

  const [activeId, onActiveIdChange] = React.useState(basePanelId);

  return (
    <Panels.Wrapper
      defaultActiveId={basePanelId}
      as={Surface}
      activeId={activeId}
      onActiveIdChange={onActiveIdChange}
      style={{
        inlineSize: '300px',
        blockSize: '500px',
        // position: 'relative',
      }}
    >
      <Panels.Panel
        id={basePanelId}
        className='HERE'
        as={List}
        // TODO: Try having the arrow keys navigation like Tree to allow focusing the share icon button
        role='tree'
        style={{}}
      >
        <Surface.Header as={Panels.Header}>Base</Surface.Header>
        {pages.map((page) => (
          <ListItem>
            <ListItem.Content>
              <Panels.Trigger for={`${page.id}`}>
                <ListItem.Action>{page.label}</ListItem.Action>
              </Panels.Trigger>
            </ListItem.Content>
            {/* TODO: Make it to something like an IconButton */}
            <ListItem.Icon>
              <SvgShare />
            </ListItem.Icon>
          </ListItem>
        ))}
      </Panels.Panel>

      {pages.map((page) => (
        <Panels.Panel
          id={`${page.id}`}
          as={Flex}
          flexDirection='column'
          alignItems='stretch'
          style={
            {
              // blockSize: '100%',
              // display: activeId === `${page.id}` ? undefined : 'none',
            }
          }
        >
          <Surface.Header as={Panels.Header}>{page.label}</Surface.Header>
          <Surface.Body
            as={Flex}
            flexDirection='column'
            style={{
              height: '100%',
            }}
          >
            <Flex.Spacer />
            <Divider />
            <Text>{`Footer for page ${page.id}`}</Text>
          </Surface.Body>
        </Panels.Panel>
      ))}
    </Panels.Wrapper>
  );
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// import * as React from 'react';
// import { Button, ButtonGroup, Text } from '@itwin/itwinui-react';

// export default function App() {
//   const pagesIndexes = React.useMemo(
//     () => [...Array(10)].map((_, index) => index),
//     [],
//   );
//   const pageRefs = React.useRef<Record<string, HTMLElement | null>>({});

//   // Reducer where all the component-wide state is stored
//   const [{ currentPageId, animations }, dispatch] = React.useReducer(
//     pageAnimationReducer,
//     {
//       currentPageId: 'page-0',
//       animations: null,
//       animationDirection: null,
//       animatingToPageId: null,
//     } as PageAnimationState,
//   );

//   const goToPage = async (direction: 'prev' | 'next') => {
//     // Page transition already in progress
//     if (animations != null) {
//       return;
//     }

//     const currentPageIndex = Number(currentPageId.slice('page-'.length));
//     const otherPageIndex =
//       direction === 'next' ? currentPageIndex + 1 : currentPageIndex - 1;
//     const otherPageId = `page-${otherPageIndex}`;

//     const animationOptions = {
//       duration: 1000,
//       iterations: 1,
//       easing: 'ease-out',
//     };

//     const animationsData = {
//       [currentPageId]:
//         direction === 'next'
//           ? [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }]
//           : [{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }],
//       [otherPageId]:
//         direction === 'next'
//           ? [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }]
//           : [
//               { transform: 'translateX(-100%)', display: 'block' },
//               { transform: 'translateX(0)', display: 'block' },
//             ],
//     };

//     dispatch({
//       type: direction,
//       animatingToPageId: `page-${otherPageIndex}`,
//       animations: animationsData,
//     });

//     await Promise.all(
//       Object.entries(animationsData).map(([pageId, keyframes]) => {
//         const element = pageRefs.current[pageId];

//         return new Promise((resolve) => {
//           if (element == null) {
//             resolve(null);
//             return;
//           }

//           const animation = element.animate(keyframes, animationOptions);

//           if (animation) {
//             animation.onfinish = () => {
//               resolve(null);
//             };
//           }
//         });
//       }),
//     );

//     dispatch({ type: 'endAnimation' });
//   };

//   return (
//     <>
//       <div
//         style={{
//           border: '1px solid red',
//           width: '300px',
//           overflow: 'hidden',
//         }}
//       >
//         <Text>currentPage = {currentPageId}</Text>
//         <ButtonGroup>
//           <Button onClick={() => goToPage('prev')}>-1</Button>
//           <Button onClick={() => goToPage('next')}>+1</Button>
//         </ButtonGroup>

//         <div
//           className='page-wrapper'
//           style={{
//             height: '200px',
//           }}
//         >
//           {pagesIndexes.map((index) => (
//             <Page
//               key={index}
//               index={index}
//               currentPageId={currentPageId}
//               animations={animations}
//               pageRefs={pageRefs}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// // ----------------------------------------------------------------------------

// const Page = ({
//   index,
//   currentPageId,
//   animations,
//   pageRefs,
// }: {
//   index: number;
//   currentPageId: PageAnimationState['currentPageId'];
//   animations: PageAnimationState['animations'];
//   pageRefs: React.RefObject<Record<string, HTMLElement | null>>;
// }) => {
//   const pageId = `page-${index}`;

//   const ref = React.useRef(null);
//   if (pageRefs.current) {
//     pageRefs.current[`page-${index}`] = ref.current;
//   }

//   return (
//     <div
//       ref={ref}
//       id={pageId}
//       className='page'
//       hidden={
//         animations == null
//           ? pageId !== currentPageId
//           : !Object.keys(animations).includes(pageId)
//       }
//       style={{
//         inlineSize: '100%',
//         border: '1px solid hotpink',

//         // Add the last keyframe styles to the current page to avoid flickering
//         // i.e. showing the current page for a split second between when the animations ends and the page is hidden
//         ...(pageId === currentPageId &&
//         animations != null &&
//         animations[pageId] != null
//           ? animations[pageId][animations[pageId].length - 1]
//           : {}),
//       }}
//     >
//       <span
//         style={{
//           display: 'block',
//           transform: 'translateX(100px)',
//         }}
//       >
//         {index}
//       </span>
//     </div>
//   );
// };

// type PageAnimationState = {
//   currentPageId: string;
//   animatingToPageId: string | null;
//   animationDirection: 'prev' | 'next' | null;
//   animations: Record<string, React.CSSProperties[]> | null;
// };

// type PageAnimationAction =
//   | {
//       type: 'prev';
//       animatingToPageId: string;
//       animations: PageAnimationState['animations'];
//     }
//   | {
//       type: 'next';
//       animatingToPageId: string;
//       animations: PageAnimationState['animations'];
//     }
//   | { type: 'endAnimation' };

// export const pageAnimationReducer = (
//   state: PageAnimationState,
//   action: PageAnimationAction,
// ): PageAnimationState => {
//   switch (action.type) {
//     case 'prev':
//     case 'next': {
//       // Animation already in progress or other page doesn't exist
//       if (
//         state.animatingToPageId != null ||
//         document.querySelector(action.animatingToPageId)
//       ) {
//         return state;
//       }

//       return {
//         ...state,
//         animatingToPageId: action.animatingToPageId,
//         animationDirection: action.type,
//         animations: action.animations,
//       };
//     }
//     case 'endAnimation': {
//       // No animation in progress
//       if (state.animatingToPageId == null) {
//         return state;
//       }

//       return {
//         ...state,
//         currentPageId: state.animatingToPageId,
//         animatingToPageId: null,
//         animationDirection: null,
//         animations: null,
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// };

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
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

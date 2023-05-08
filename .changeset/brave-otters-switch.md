---
'@itwin/itwinui-react': minor
---

Add `SearchBox` component for your search needs. It can be used as static or expandable version of SearchBox.

```ts
<SearchBox inputProps={{placeholder:'Basic search'}} />
<SearchBox expandable inputProps={{placeholder:'Expandable search'}} />
```

`SearchBox` has subcomponents which can be passed as children to customise the look:

- `SearchBox.Icon` - Icon to use within searchbox. By default it has looking glass svg.
- `SearchBox.Button` - Icon button to use within searchbox. By default it has looking glass svg as content.
- `SearchBox.Input` - Input component to use within searchbox.
- `SearchBox.CollapseButton` - Button that will close searchbox when expanded.
- `SearchBox.ExpandButton` - Button that will expand searchbox when collapsed.

```ts
<SearchBox>
  <SearchBox.Button title='Search button' />
  <SearchBox.Input placeholder='Basic search with custom interactions' />
  <Text
    isMuted
    variant='body'
    as='p'
    style={{ paddingRight: 'var(--iui-size-s)', alignSelf: 'center' }}
  >
    0/3
  </Text>
  <Divider orientation='vertical' />
  <SearchBox.Button>
    <SvgCaretUpSmall />
  </SearchBox.Button>
  <SearchBox.Button>
    <SvgCaretDownSmall />
  </SearchBox.Button>
</SearchBox>
```

Use `SearchBox.CollapsedState` and `SearchBox.ExpandedState` subcomponents for expandable SearchBox customization.

```ts
<SearchBox expandable>
  <SearchBox.CollapsedState>
    <SearchBox.ExpandButton />
  </SearchBox.CollapsedState>
  <SearchBox.ExpandedState>
    <SearchBox.Input placeholder='Basic search with custom interactions' />
    <SearchBox.CollapseButton aria-label='Collapse SearchBox'/>
    <Text
      isMuted
      variant='body'
      as='p'
      style={{ paddingRight: 'var(--iui-size-s)', alignSelf: 'center' }}
    >
      0/3
    </Text>
    <Divider orientation='vertical' />
    <SearchBox.Button>
      <SvgCaretUpSmall />
    </SearchBox.Button>
    <SearchBox.Button>
      <SvgCaretDownSmall />
    </SearchBox.Button>
  </SearchBox.ExpandedState>
</SearchBox>
```

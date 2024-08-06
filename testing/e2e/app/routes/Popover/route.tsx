import { Popover } from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';

export default function Page() {
  const [searchParams] = useSearchParams();

  const shouldImperativeFocus = searchParams.get('imperativeFocus') === 'true';
  const shouldFocusInput = searchParams.get('focusInput') === 'true';

  return (
    <>
      <Popover
        applyBackground
        content={
          <div>
            <h2
              tabIndex={-1}
              ref={shouldImperativeFocus ? (el) => el?.focus() : undefined}
            >
              Popover title
            </h2>
            <p>Popover content</p>
            {shouldFocusInput && <input />}
          </div>
        }
      >
        <button>Open</button>
      </Popover>
    </>
  );
}

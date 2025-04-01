
import { Children } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className={``}>
        {Children.map(children, child =>
            <>
              {child}
            </>
          )
    }</div>;
  }
  
import { cn } from '../utils';

const Container = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <section
            style={{ width: '414px', minWidth: '414px', maxWidth: 'none', flexShrink: 0 }}
            className={cn(
                `flex h-screen w-[414px] min-w-[414px] shrink-0 relative flex-col gap-4 items-center`,
                className,
            )}
        >
            {children}
        </section>
    );
};

export default Container;


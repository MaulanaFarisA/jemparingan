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
            className={cn(
                `flex h-screen aspect-9/16 max-w-[33vw] flex-col gap-4 px-10 py-10 sm:px-8 items-center`,
                className,
            )}
        >
            {children}
        </section>
    );
};

export default Container;


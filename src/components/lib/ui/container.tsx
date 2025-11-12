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
                `flex w-full max-w-7xl mx-118 flex-col gap-4 px-10 py-10 sm:px-8 items-center`,
                className,
            )}
        >
            {children}
        </section>
    );
};

export default Container;


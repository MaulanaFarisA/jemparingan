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
                `flex h-screen aspect-[9/16] max-w-[33vw] flex-col items-center bg-transparent overflow-hidden relative shadow-2xl`,
                className,
            )}
        >
            {children}
        </section>
    );
};

export default Container;
import { useEffect,useRef } from "react";
type LoadMoreTriggerProps={
    onVisible: () =>void;
    disabled?: boolean;

};
export function LoadMoreTrigger({
    onVisible,
    disabled = false,
}: LoadMoreTriggerProps){
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (disabled) return;
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    onVisible();
                }
            },
            {
                rootMargin: "200px",
            }
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [onVisible, disabled]);

    return <div ref={ref} />;
}
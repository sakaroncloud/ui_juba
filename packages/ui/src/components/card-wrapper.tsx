import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";

type Props = {
    title: string;
    children: React.ReactNode;
};
export const CardWrapper = ({ title, children }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};
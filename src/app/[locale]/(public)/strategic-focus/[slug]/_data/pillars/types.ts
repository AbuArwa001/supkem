export interface StrategicStrategy {
    name: string;
    interventions: string[];
}

export interface StrategicSection {
    title: string;
    icon: string;
    content: string;
    strategies: StrategicStrategy[];
}

export interface StrategicPillar {
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    sections: StrategicSection[];
}

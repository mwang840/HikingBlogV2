import { NPSKey } from "@/components/parksKey";
import Image from "next/image";
import { useQuery } from "react-query";
import { Park } from "@/@types/api/Park/Park";
import React from "react";
import { ParkCard } from "./ParkCard";

type ParkListProperties = {
    search: string;
    onSearchChange?: (newSearch: string) => void;
};

// Function to calculate relevance score for a park based on search query
const calculateRelevanceScore = (park: Park, searchQuery: string): number => {
    if (!searchQuery.trim()) return 0;
    
    const query = searchQuery.toLowerCase().trim();
    const queryWords = query.split(/\s+/);
    let score = 0;
    
    // Exact matches get highest scores
    if (park.fullName.toLowerCase() === query) score += 200;
    if (park.name.toLowerCase() === query) score += 180;
    if (park.parkCode.toLowerCase() === query) score += 160;
    
    // Contains matches get high scores
    if (park.fullName.toLowerCase().includes(query)) score += 100;
    if (park.name.toLowerCase().includes(query)) score += 90;
    if (park.parkCode.toLowerCase().includes(query)) score += 80;
    
    // Word-by-word matching for better relevance
    queryWords.forEach(word => {
        if (word.length < 2) return; // Skip very short words
        
        if (park.fullName.toLowerCase().includes(word)) score += 40;
        if (park.name.toLowerCase().includes(word)) score += 35;
        if (park.description.toLowerCase().includes(word)) score += 20;
        if (park.states.toLowerCase().includes(word)) score += 30;
        
        // Activity and topic matches
        park.activities.forEach(activity => {
            if (activity.name.toLowerCase().includes(word)) score += 25;
        });
        
        park.topics.forEach(topic => {
            if (topic.name.toLowerCase().includes(word)) score += 20;
        });
    });
    
    // Description relevance
    if (park.description.toLowerCase().includes(query)) score += 30;
    
    // State/region relevance
    if (park.states.toLowerCase().includes(query)) score += 40;
    
    // Use the API's relevance score if available
    if (park.relevanceScore) {
        score += park.relevanceScore;
    }
    
    return score;
};

export const ParkList = ({ search, onSearchChange }: ParkListProperties) => {
    const apiUrl = "https://developer.nps.gov/api/v1/parks";

    const { error, status, data } = useQuery<Park[], Error, Park[]>({
        queryKey: `park_data_${search}`,
        queryFn: async (context) => {
            // Only fetch if there's a search query
            if (!search.trim()) return [];
            
            // Build search parameters
            const params = new URLSearchParams({
                q: search,
                limit: '50',
                api_key: NPSKey
            });
            
            // If search looks like a state code (2 letters), add state filter
            if (/^[A-Za-z]{2}$/.test(search.trim())) {
                params.set('stateCode', search.trim().toUpperCase());
            }
            
            const fetchResponse = await fetch(
                `${apiUrl}?${params.toString()}`,
            );
            console.log(fetchResponse);
            const searchedParks = await fetchResponse.json();

            const { data } = searchedParks;

            return data as Park[];
        },
        enabled: !!search.trim(), // Only run query when there's a search term
    });

    // Sort parks by relevance score - must be before any early returns
    const sortedParks = React.useMemo(() => {
        if (!data || !search.trim()) return data;
        
        const parksWithScores = data.map(park => ({
            ...park,
            _relevanceScore: calculateRelevanceScore(park, search)
        }));
        
        const sorted = parksWithScores.sort((a, b) => b._relevanceScore - a._relevanceScore);
        
        // Log the top results for debugging
        console.log('Top search results:', sorted.slice(0, 5).map(p => ({
            name: p.fullName,
            score: p._relevanceScore
        })));
        
        return sorted;
    }, [data, search]);

    if (status === "loading") {
        return (
            <div className="text-center mt-8">
                <div className="loading loading-spinner loading-lg"></div>
                <p className="mt-2 text-gray-600">Searching for parks...</p>
            </div>
        );
    }
    
    if (status !== "success") {
        return <span className="hidden" />;
    }
    
    // Show message when no search has been entered
    if (!search.trim()) {
        return (
            <div className="text-center mt-8">
                <div className="text-lg text-gray-500 mb-4">
                    Enter a park name, location, or activity to search for parks
                </div>
                <div className="text-sm text-gray-400">
                    <p className="mb-2">Try searching for:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {['Yellowstone', 'Yosemite', 'Grand Canyon', 'CA', 'NY', 'Hiking', 'Camping', 'Wildlife'].map((suggestion) => (
                            <span 
                                key={suggestion}
                                className="badge badge-outline badge-sm cursor-pointer hover:badge-primary"
                                onClick={() => onSearchChange?.(suggestion)}
                            >
                                {suggestion}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    
    console.log(error);
    if (error) {
        return (
            <div className="text-lg font-bold text-center">
                {"The park you searched for does not exist!"}
            </div>
        );
    }

    console.log("data = ", data);

    return (
        <div className="flex flex-col gap-4 rounded-md">
            {search.trim() && (
                <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Search Results for &ldquo;{search}&rdquo;
                    </h2>
                    <div className="text-sm text-gray-600">
                        {sortedParks?.length ? 
                            `Found ${sortedParks.length} park${sortedParks.length === 1 ? '' : 's'}` :
                            `No parks found`
                        }
                    </div>
                </div>
            )}
            {sortedParks?.map((eachData) => (
                <ParkCard key={eachData.id} park={eachData} searchQuery={search} />
            ))}
        </div>
    );
};

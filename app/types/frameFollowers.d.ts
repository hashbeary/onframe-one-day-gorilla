export interface FrameFollowers {
	users: {
		fid: number;
		custodyAddress: string;
		username: string;
		displayName: string;
		pfp: {
			url: string;
		};
		profile: {
			bio: {
				text: string;
				mentionedProfiles: string[];
			};
		};
		followerCount: number;
		followingCount: number;
		verifications: string[];
		activeStatus: "active" | "inactive";
		timestamp: string;
		viewerContext: {
			following: boolean;
			followedBy: boolean;
		};
	}[];
	next: {
		cursor: string;
	};
}

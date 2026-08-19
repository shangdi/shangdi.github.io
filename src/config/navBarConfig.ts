import {
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/navBarConfig";

// ============================================================================
// 导航栏配置 - 根据顺序动态生成导航栏链接
// NavBar Configuration - Dynamically generate navigation bar links based on order
// ============================================================================
const getDynamicNavBarConfig = (): NavBarConfig => {
	// 基础导航栏链接
	const links: NavBarLink[] = [];

	// 主页
	links.push(LinkPresets.Home);

	// 文章及其子菜单
	links.push({
		// name: "記事",
		name: "Article",
		url: "#",
		icon: "material-symbols:article",
		children: [
			// 归档
			LinkPresets.Archive,

			// 分类
			LinkPresets.Categories,

			// 标签
			LinkPresets.Tags,
		],
	});

	//社交及其子菜单
	links.push({
		// name: "社交",
		name: "Social",
		url: "#",
		icon: "material-symbols:group",
		children: [
			// 友链
			LinkPresets.Friends,

			// 留言
			LinkPresets.Guestbook,
		],
	});

	// 我的及其子菜单
	links.push({
		// name: "人称",
		name: "Personal",
		url: "#",
		icon: "material-symbols:person",
		children: [
			// 动态
			LinkPresets.Dynamic,

			// 相册
			LinkPresets.Gallery,

			// 书签导航
			LinkPresets.Booknav,

			// 哔哩哔哩追番
			LinkPresets.Bilibili,

			// 番组计划
			LinkPresets.Bangumi,

			// VNDB
			LinkPresets.VNDB,

			// MyAnimeList
			LinkPresets.MAL,
		],
	});

	// 关于及其子菜单
	links.push({
		// name: "情報",
		name: "About",
		url: "#",
		icon: "material-symbols:info",
		children: [
			// 打赏
			LinkPresets.Sponsor,

			// 关于页面
			LinkPresets.About,
		],
	});

	// 自定义导航栏链接
	links.push({
		// name: "接続",
		name: "Link",
		url: "#",
		icon: "material-symbols:link",
		// 子菜单
		children: [
			{
				name: "GitHub",
				url: "https://github.com/shangdi/shangdi.github.io",
				external: true,
				icon: "fa7-brands:github",
			},
			// { 
			// 	 name: "Gitee",
			// 	 url: "https://gitee.com/CuteLeaf/Firefly",
			// 	 external: true,
			// 	 icon: "fa7-brands:gitee",
			// } ,
			// { 
			// 	 name: "QQ交流群",
			// 	 url: "https://qm.qq.com/q/ZGsFa8qX2G",
			// 	 external: true,
			// 	 icon: "fa7-brands:qq",
			// } ,
			// { 
			// 	 name: "Firefly文档",
			// 	 url: "https://docs-firefly.cuteleaf.cn",
			// 	 external: true,
			// 	 icon: "material-symbols:docs",
			// } ,
		],
	});

	// 文档链接
	// links.push({
	// 	name: "文档",
	// 	url: "https://docs-firefly.cuteleaf.cn",
	// 	external: true,
	// 	icon: "material-symbols:docs",
	// });

	return { links } as NavBarConfig;
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

// ============================================================================
// 链接预设 - 可自由自定义导航栏链接的名称、图标和URL
// Link Presets - Allows free customization of the name, icon, and URL of navigation bar links
// ============================================================================
export const LinkPresets: Record<string, NavBarLink> = {
	Home: {
		// name: "家",
		name: "Home",
		url: "/",
		icon: "material-symbols:home",
	},
	Dynamic: {
		name: "Moments",
		url: "/dynamic/",
		icon: "material-symbols:forum-rounded",
		pageKey: "dynamic",
	},
	Archive: {
		name: "Archive",
		url: "/archive/",
		icon: "material-symbols:archive",
	},
	Categories: {
		name: "Categories",
		url: "/categories/",
		icon: "material-symbols:folder-open-rounded",
	},
	Tags: {
		name: "Tags",
		url: "/tags/",
		icon: "material-symbols:tag-rounded",
	},
	Friends: {
		name: "Friends",
		url: "/friends/",
		icon: "material-symbols:link-2-rounded",
		pageKey: "friends",
	},
	Sponsor: {
		name: "Favorite",
		url: "/sponsor/",
		icon: "material-symbols:favorite",
		pageKey: "sponsor",
	},
	Guestbook: {
		name: "Guestbook",
		url: "/guestbook/",
		icon: "material-symbols:chat",
		pageKey: "guestbook",
	},
	About: {
		name: "About",
		url: "/about/",
		icon: "material-symbols:person",
	},
	Bangumi: {
		name: "Movie",
		url: "/bangumi/",
		icon: "material-symbols:movie",
		pageKey: "bangumi",
	},
	VNDB: {
		name: "VNDB",
		url: "/vndb/",
		icon: "material-symbols:chrome-reader-mode-rounded",
		pageKey: "vndb",
	},
	Bilibili: {
		name: "哔哩哔哩",
		url: "/bilibili/",
		icon: "fa7-brands:bilibili",
		pageKey: "bilibili",
	},
	MAL: {
		name: "MAL",
		url: "/myanimelist/",
		icon: "material-symbols:menu-book",
		pageKey: "mal",
	},
	Gallery: {
		name: "Gallery",
		url: "/gallery/",
		icon: "material-symbols:photo-library",
		pageKey: "gallery",
	},
	Anime: {
		name: "Anime",
		url: "/anime/",
		icon: "material-symbols:live-tv",
		pageKey: "anime",
	},
	Booknav: {
		name: "Booknav",
		url: "/booknav/",
		icon: "material-symbols:bookmarks",
		pageKey: "booknav",
	},
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();

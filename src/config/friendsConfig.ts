import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: true,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "夏夜流萤",
		imgurl:
			"https://weavatar.com/avatar/d252655d40d6874417a720bad0a6c5f77f8f6a1fd2f882f8f338402dc37e4190?s=640",
		desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 50, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "JerryLife",
		imgurl: "https://img.jerry-nis.top/d8703c5c-4c4a-49cc-bd94-3363c9eda2d8.png",
		desc: "Enjoy life",
		siteurl: "https://jerrynis.com",
		tags: ["Blog"],
		weight: 49, 
		enabled: true, 
	},
	{
		title: "Hyde Blog",
		imgurl: "https://seasir.top/assets/avatar.avif",
		desc: "人心中的成见是一座大山",
		siteurl: "https://seasir.top",
		tags: ["Blog"],
		weight: 48, 
		enabled: true, 
	},
	{
		title: "团子和蛋糕",
		imgurl: "https://blog.tsh520.cn/assets/ziyuan/tx.webp",
		desc: "如果你喜欢那么欢迎来到我的世界！",
		siteurl: "https://blog.tsh520.cn",
		tags: ["Blog"],
		weight: 47, 
		enabled: true, 
	},
	{
		title: "清羽飞扬",
		imgurl: "https://blog.liushen.fun/info/avatar.ico",
		desc: "柳影曳曳，清酒孤灯，扬笔撒墨，心境如霜",
		siteurl: "https://blog.liushen.fun/",
		tags: ["Blog"],
		weight: 46, 
		enabled: true, 
	},
	{
		title: "Jurnal SysAdmin",
		imgurl: "https://jurnal.arch.or.id/images/logo_hu_6dff3f2baa66b4e7.png",
		desc: "Catatan SysAdmin",
		siteurl: "https://jurnal.arch.or.id/",
		tags: ["Blog"],
		weight: 45, 
		enabled: true, 
	},
	{
		title: "xane",
		imgurl: "https://d9f.cc.cd/file/1784710214848_tx.jpg",
		desc: "Keep going.",
		siteurl: "https://xane.eu.cc",
		tags: ["Blog"],
		weight: 44, 
		enabled: true, 
	},
	{
		title: "UpXuu's blog",
		imgurl: "https://upxuu.com/images/me.jpg",
		desc: "逐光而上",
		siteurl: "https://upxuu.com",
		tags: ["Blog"],
		weight: 43, 
		enabled: true, 
	},
	{
		title: "Eliauk's Blog",
		imgurl: "https://img.eliauk312.top/avatar/default-avatar.jpg",
		desc: "一方天地，记录代码、生活和偶尔的奇思妙想。",
		siteurl: "https://eliauk312.top/",
		tags: ["Blog"],
		weight: 42, 
		enabled: true, 
	},
	{
		title: "伊linxiyy-微博客",
		imgurl: "https://lxya.net/api/images/a7630eac-ec4b-4729-ae67-461d7a48c0d9",
		desc: "记录生活，分享技术，留住美好瞬间",
		siteurl: "https://lxya.net",
		tags: ["Blog"],
		weight: 41, 
		enabled: true, 
	},
	{
		title: "王一君Mew",
		imgurl: "https://wyjmew.cn/app.png",
		desc: "你奔向我的每一步，都是我心动的理由",
		siteurl: "https://wyjmew.cn/",
		tags: ["Blog"],
		weight: 40, 
		enabled: true, 
	},
	{
		title: "卖烤肉 - Carpe Diem",
		imgurl: "https://cdn.ncii.cn/picbase/lsky/2025/06/19/68536bcb5851d.webp",
		desc: "人生苦短，及时行乐。",
		siteurl: "https://b.ncii.cn/",
    tags: ["Blog"],
		weight: 39, 
		enabled: true, 
	},
	{
		title: "南方嘉木",
		imgurl: "https://blog.cancin.cn/img/avatar.webp",
		desc: "不畏将来，不念过往。",
		siteurl: "https://blog.cancin.cn/",
    tags: ["Blog"],
		weight: 38, 
		enabled: true, 
	},
	{
		title: "Sanrei",
		imgurl: "https://avatars.githubusercontent.com/u/100203867?v=4",
		desc: "Enjoy the journey~!",
		siteurl: "https://adilhyz.github.io/",
    tags: ["Blog"],
		weight: 37, 
		enabled: true, 
	},
	{
		title: "PullSec",
		imgurl: "https://pullsec.io/images/cat.jpg",
		desc: "Building systems, breaking assumptions, and understanding how things really work.",
		siteurl: "https://pullsec.io",
    tags: ["Blog"],
		weight: 36, 
		enabled: true, 
	},
	{
		title: "Ariasakaの小窝",
		imgurl: "https://img.0v0.my/2024/12/05/67517bcf104da.png",
		desc: "人有悲欢离合 月有阴晴圆缺",
		siteurl: "https://blog.yaria.top",
    tags: ["Blog"],
		weight: 35, 
		enabled: true, 
	},
	{
		title: "彬红茶日记",
		imgurl: "https://note.redcha.cn/upload/favicon-256x256.png",
		desc: "Redcha's Personal Blog",
		siteurl: "https://note.redcha.cn",
    tags: ["Blog"],
		weight: 34, 
		enabled: true, 
	},
	{
		title: "栖童の小站",
		imgurl: "https://blog.linux-qitong.top/img/avatar.webp",
		desc: "越努力,越幸运",
		siteurl: "https://blog.linux-qitong.top",
    tags: ["Blog"],
		weight: 33, 
		enabled: true, 
	},
	{
		title: "Firefly Docs",
		imgurl: "https://docs-firefly.cuteleaf.cn/logo.png",
		desc: "Firefly主题模板文档",
		siteurl: "https://docs-firefly.cuteleaf.cn",
		tags: ["Docs"],
		weight: 9,
		enabled: false,
	},
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
		weight: 8,
		enabled: false,
	},
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};

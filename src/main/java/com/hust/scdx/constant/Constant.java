package com.hust.scdx.constant;

public class Constant {

	public final static String UESR = "user";
	public final static String USERPOWER = "userpower";

	public final static String UNKNOWN = "未知";
	public final static String INVALID_TIME = "1970-01-01";

	public static class Index {
		public static final int TITLE = 0;
		public static final int URL = 1;
		public static final int TIME = 2;

		public static final int COUNT_ITEM_INDEX = 0;
		public static final int COUNT_ITEM_AMOUNT = 1;
	}

	public static class Cluster {
		public static final String CONTENT = "content";
		public static final String ORIGCLUSTERS = "origClusters";
		public static final String ORIGCOUNTS = "origCounts";
		public static final String DISPLAYRESULT = "displayResult";

		public static final String REDIS_CONTENT = "redis_content";
		public static final String REDIS_ORIGCLUSTER = "redis_OrigClusters";
		public static final String REDIS_ORIGCOUNT = "redis_OrigCounts";
	}

	/**
	 * 域名文件的基本属性列下标
	 * 
	 * @author Jack
	 *
	 */
	public static class DomainExcelAttr {
		public static final int URL_INDEX = 0;
		public static final int NAME_INDEX = 1;
		public static final int COLUMN_INDEX = 2;
		public static final int TYPE_INDEX = 3;
		public static final int RANK_INDEX = 4;
		public static final int INCIDENCE_INDEX = 5;
		public static final int WEIGHT_INDEX = 6;
	}

	public static class Algorithm {
		public static final int DIGITAL = 1;
		public static final int TFIDF = 2;

		public static final int AcrossSimilarity = 1; // 粗粒度
		public static final int CosSimilarity = 2; // 细粒度

		public static float SIMILARITYTHRESHOLD = 0.4f;
		public static int MINPTS = 2;
		public static float EPS = 0.6f;

		public static final int CANOPY = 1;
		public static final int KMEANS = 2;
		public static final int DBSCAN = 3;
	}

	public static class WordFont {
		public static final String HEITI = "黑体";
		public static final String XINSONGTI = "新宋体";
		public static final String KAITI = "楷体_GB2312";
		public static final String SONGTI = "宋体";
		public static final String FANGSONG = "华文仿宋";

		public static final String RED = "FF0000";
		public static final String GREEN = "008B00";
	}
}
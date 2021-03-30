const TABLE_FILE_LIST = [
    ["slon_facts","slon-facts.csv"],
    ["mviews_calltracking","mviews-calltracking.csv"], 
    ["slon_r_tags_v2","slon-r_tags_v2.csv"]
]

const CREATE_DB_QUERY_LIST = [
    `CREATE TABLE slon_facts (
        EventDate Date,
        HourDate UInt8,
        MinuteDate UInt8,
        SecondDate UInt8,
        web_id UInt32,
        user_id UInt32,
        project_id UInt16,
        marka_id Array(UInt32),
        event_id Array(UInt16),
        owner_id Array(UInt32),
        proposal_id Array(UInt32),
        conversion_value UInt16
      ) ENGINE = MergeTree(EventDate, (web_id, user_id), 8192)`,
      `CREATE TABLE mviews_calltracking (
        EventDate Date,
        date_time DateTime,
        web_id UInt32,
        user_id UInt32,
        event_id Array(UInt16),
        calltracking_product_id Array(UInt8),
        owner_id Array(UInt32),
        proposal_id Array(UInt32),
        call_status UInt8
      ) ENGINE = MergeTree(EventDate, (web_id, user_id), 8192)`,
      ` CREATE TABLE slon_r_tags_v2 (
        EventDate Date,
        HourDate UInt8,
        MinuteDate UInt8,
        SecondDate UInt8,
        web_id UInt32,
        user_id UInt32,
        project_id UInt16,
        r_audience String,
        r_source String,
        r_medium String,
        r_campaign String,
        event_id Array(UInt16)
      ) 
      ENGINE = MergeTree(EventDate, (web_id, user_id), 8192)`
]

module.exports = {TABLE_FILE_LIST, CREATE_DB_QUERY_LIST}
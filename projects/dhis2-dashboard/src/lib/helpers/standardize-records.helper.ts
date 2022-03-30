import { map, each } from 'lodash';

export function formatRecords(records, selectedFields) {
  return map(records, (record) => {
    let formattedKeyValuePairedRecordValues = {};
    each(
      record?.recordValues.filter(
        (recordValue) =>
          (
            selectedFields.filter(
              (selectedField) => selectedField?.id === recordValue?.field
            ) || []
          )?.length > 0
      ),
      (filteredRecordValue) => {
        formattedKeyValuePairedRecordValues[filteredRecordValue?.field] =
          filteredRecordValue?.value;
      }
    );
    return {
      created: record?.created,
      createdBy: record?.createdBy,
      form: record?.form,
      organisationUnit: record?.organisationUnit,
      ...formattedKeyValuePairedRecordValues,
    };
  });
}

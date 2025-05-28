export class DatasetInfo {
  constructor(
    public title: string = '',
    public description: string = '',
  ) {}

  cloneWith(partialDatasetInfo: Partial<DatasetInfo>): DatasetInfo {
    return new DatasetInfo(
      partialDatasetInfo.title ?? this.title,
      partialDatasetInfo.description ?? this.description,
    );
  }
}
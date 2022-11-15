# NGX DHIS2 Dictionary

Angular based DHIS2 library for telling a story of metadata eg indicator

## Using the library

To use the library, put this in your component

```
<div class="dictionary-block">
        <ngx-dhis2-dictionary-list
          [metadataIdentifiers]="metadataIdentifiers"
          [selectedItem]="selectedItem"
          [dictionaryConfig]="dictionaryConfig"
          (dictionaryItemId)="dictionaryItemId($event)"
          (metadataInfo)="metadataInfo($event)"
          (metadataGroupsInfo)="metadataGroupsInfo($event)"
        ></ngx-dhis2-dictionary-list>
</div>
```

Where metadataIdentifiers are DHIS2 metadata ids you want to get e.g ["ssasdawqwrw","wiweuwejfq"].

dictionaryConfig is

```
        {
                showAllBlock: true,
        }
```

Selected item can be passed or not, if passed should be one of the metadata ids you want to be selected by default

dictionaryItem outputs the url with format "ids/selected/selectedId"

metadataInfo is an output object with the format below

```{
        type: "indicator",
        data: [array of loaded metadata]
   }
```

      for type 'indicator' you get indicator and for type 'programIndicator' you get program indicators

metadataGroupsInfo is an out put for indicator or programIndicator groups.

````[
        {
                id: "groupIdentifier",
                name: "Name",
                metadataTypeKey: "[{"id": "indentifier"}]"
        }

  ]```
  metadataTypeKey can be "indicators" or "programIndicators"

Currently supported ones are indicators, program indicators, data sets, data elements and functions
````

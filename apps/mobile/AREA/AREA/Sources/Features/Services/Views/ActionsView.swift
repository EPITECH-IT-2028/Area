//
//  ActionsView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 12/01/2026.
//

import SwiftUI

struct ActionsView: View {
	@State private var searchText: String = ""
	var selectedService: Service

	var body: some View {
		ActionsCollectionView(
			serviceName: selectedService.name,
			searchText: searchText
		)
		.searchable(text: $searchText)
		.navigationTitle(LocalizedStringResource.actionsTitle)
	}
}

//
//  ServicesView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import SwiftUI

struct ServicesView: View {
	@State private var searchText: String = ""

	var body: some View {
		NavigationStack {
			CollectionView(searchText: searchText)
		}
		.searchable(text: $searchText)
		.navigationTitle(LocalizedStringResource.servicesTitle)
	}
}

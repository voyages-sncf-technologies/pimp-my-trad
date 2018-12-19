/*
 *
 *  * Copyright (C) 2018 VSCT
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

package sncf.oui.pmt.domain.export;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import sncf.oui.pmt.DomainDrivenDesign;

@DomainDrivenDesign.Repository
public interface ExportMetaRepository {
    Flux<ExportMetadata> findRecent(int weekNum);
    Mono<ExportMetadata> findByExportId(String id);
    Mono<Void> deleteById(String exportId);
    Mono<ExportMetadata> save(ExportMetadata exportMetadata);
}

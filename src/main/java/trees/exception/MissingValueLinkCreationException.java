package trees.exception;

import trees.domain.dto.link.RootCreationDTO;

public class MissingValueLinkCreationException extends RuntimeException {

    public MissingValueLinkCreationException(final String field, final RootCreationDTO linkDto) {
        super("Missing " + field + " value in link creation: " + linkDto.toString());
    }

}
